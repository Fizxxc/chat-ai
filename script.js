// Mengirim pesan dari input
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const input = document.getElementById("user-input");
    const userMessage = input.value.trim();

    if (userMessage) {
        addMessage(userMessage, "user");
        input.value = "";

        setTimeout(() => {
            const aiResponse = generateAIResponse(userMessage);
            addMessage(aiResponse, "ai");
        }, 1000);
    }
}

// Menggabungkan pesan ke chat-box
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerText = `${sender === "user" ? "User: " : "AI: "} ${text}`;

    chatBox.appendChild(messageDiv);

    // Scroll chat-box otomatis ke bawah ketika pesan ditambahkan
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Respons AI lebih natural seperti chatbot umum
const aiResponses = [
    "Tentu! Ada hal yang bisa saya bantu?",
    "Silakan jelaskan apa yang ingin Anda ketahui.",
    "Mari kita diskusikan hal ini lebih dalam.",
    "Saya siap membantu Anda. Apa yang ingin dibahas?",
    "Apakah ada hal spesifik yang ingin Anda tanyakan?",
    "Teknologi AI dapat membantu dalam berbagai aspek.",
    "Berikan pertanyaannya, dan saya akan cari jawabannya.",
    "Mari kita cari solusi terbaik untuk masalah ini.",
    "Jika Anda ingin belajar tentang sesuatu, saya siap membantu.",
    "Apa pendapat Anda tentang teknologi saat ini?",
    "Saya suka tantangan! Beri saya pertanyaannya.",
    "Ingin penjelasan tentang teknologi atau sains?",
    "Setiap pertanyaan membuka pintu pengetahuan baru.",
    "Bagaimana saya dapat membantu Anda hari ini?",
    "Mari kita eksplorasi ide kreatif bersama.",
    "AI dapat membantu dalam analisis, saran, dan inovasi.",
    "Silakan tanyakan hal-hal tentang sains, teknologi, atau kehidupan.",
    "Pengalaman AI membantu menemukan jawaban yang menarik.",
    "Kolaborasi antara manusia dan AI menciptakan peluang baru.",
    "Saya di sini untuk membantu, tanyakan apa saja.",
    "Mari kita jelajahi ide-ide kreatif bersama.",
    "Pertanyaan adalah awal dari semua penemuan.",
    "Saya dapat membantu dengan saran, penjelasan, atau fakta.",
    "Bagaimana pandangan Anda tentang teknologi masa depan?",
    "Silakan bertanya, saya akan menjawab dengan penjelasan detail.",
    "AI sering kali memiliki banyak informasi tentang banyak hal.",
    "Pengetahuan adalah perjalanan tanpa akhir, mari jelajahi!",
    "Apa hal menarik yang ingin Anda diskusikan?",
    "Silakan berbicara, saya siap menjadi teman diskusi.",
    "Kreativitas dan teknologi membuka peluang tak terbatas.",
    "Saya dapat menjelaskan konsep rumit menjadi sederhana.",
    "Mari kita eksplorasi bersama pengetahuan yang luas ini.",
    "Setiap interaksi membantu kita memahami hal-hal lebih dalam.",
    "Sains, teknologi, kreativitas – semua bisa kita jelajahi.",
    "Apa hal menarik yang ingin Anda ketahui hari ini?",
    "Mari berdiskusi tentang masa depan teknologi bersama AI."
];

function generateAIResponse(userText) {
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    return aiResponses[randomIndex];
}
