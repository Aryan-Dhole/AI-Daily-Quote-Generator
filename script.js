function has24HoursPassed(lastTime) {
    const now = Date.now();
    return now - lastTime > 24 * 60 * 60 * 1000;
}

function saveQuoteToStorage(quote) {
    const now = Date.now();
    localStorage.setItem("dailyQuote", quote);
    localStorage.setItem("quoteTimestamp", now.toString());
}

function loadStoredQuote() {
    const quote = localStorage.getItem("dailyQuote");
    const timestamp = parseInt(localStorage.getItem("quoteTimestamp"), 10);
    return { quote, timestamp };
}

function resetLock() {
    localStorage.removeItem("dailyQuote");
    localStorage.removeItem("quoteTimestamp");
    alert("Quote lock has been reset (DEV ONLY).");
}


async function generateQuote() {
    const topic = document.getElementById("topicInput").value.trim();
    const output = document.getElementById("output");
    const spinner = document.getElementById("spinner");

    const { quote, timestamp } = loadStoredQuote();

    if (quote && timestamp && !has24HoursPassed(timestamp)) {
        output.innerText = quote;
        alert("You've already received today's quote. Come back in 24 hours.");
        return;
    }

    if (!topic) {
        output.innerHTML = "<span>Please enter a topic.</span>";
        return;
    }

    output.innerHTML = "";
    spinner.style.display = "block";

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer YOUR_OPENROUTER_KEY_HERE",//REPLACE WITH YOUR KEY
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost", // or your Netlify domain
                "X-Title": "quote-generator"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `Give me a short, powerful inspirational quote about "${topic}". Only return the quote.`
                    }
                ],
                temperature: 0.8,
                max_tokens: 80
            })
        });

        const data = await res.json();

        if (!res.ok || !data.choices || !data.choices[0]) {
            throw new Error("Invalid AI response");
        }

        const rawQuote = data.choices[0].message.content.trim();
        const cleanedQuote = rawQuote.replace(/^["“]|["”]$/g, '').trim();

        output.innerText = ""
        typeWriterEffect(cleanedQuote);
        saveQuoteToStorage(cleanedQuote);
        console.log(data);


    } catch (err) {
        output.innerHTML = `<span class="text-danger">Error: ${err.message}</span>`;
    } finally {
        spinner.style.display = "none";
    }
}

function typeWriterEffect(text, index = 0) {
    output = document.getElementById("output")

    if (index < text.length) {
        output.innerHTML += text.charAt(index)
        setTimeout(() => typeWriterEffect(text, index + 1), 30)
    }
}