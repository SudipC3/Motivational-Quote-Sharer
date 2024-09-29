const quote = document.getElementsByTagName("blockquote")[0];
const author = document.getElementsByClassName("author")[0];

const newQuote = document.querySelector(".newQuote");
const tweet = document.querySelector(".tweet");
const copyQuote = document.querySelector(".copyQuote");
const darkModeToggle = document.querySelector(".darkModeToggle");

const apiKey = "https://quotes-api-self.vercel.app/quote";

let temp = "";

const getData = async () => {
    quote.classList.remove("fade");
    author.classList.remove("fade");
    quote.innerText = "Loading...";
    author.innerText = "";

    try {
        const data = await fetch(apiKey);
        if (!data.ok) {
            throw new Error("Failed to fetch the quote. Please try again later.");
        }
        const response = await data.json();
        temp = response;

        quote.innerText = response.quote;
        author.innerText = `- ${response.author}`;
        quote.classList.add("fade");
        author.classList.add("fade");
    } catch (error) {
        quote.innerText = "Oops! Something went wrong.";
        author.innerText = "Please try again later.";
        console.error(error);
    }
};

// Fetch initial quote on load
getData();

// Event Listeners
newQuote.addEventListener("click", getData);

tweet.addEventListener("click", () => {
    const tweetText = temp.quote.length > 250 ? temp.quote.substring(0, 247) + "..." : temp.quote;
    window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)} - ${temp.author}`,
        "Tweet Window",
        "width=400,height=400"
    );
});

copyQuote.addEventListener("click", () => {
    const textToCopy = `"${temp.quote}" - ${temp.author}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Quote copied to clipboard!");
        })
        .catch(err => {
            console.error("Could not copy text: ", err);
        });
});

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
