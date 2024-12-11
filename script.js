document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");

    // Mengikat event listeners setelah DOM dimuat
    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) {
        console.log("Button Send ditemukan.");
        sendBtn.addEventListener("click", sendMessage);
    } else {
        console.error("Button Send tidak ditemukan!");
    }

    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) {
        console.log("Button Clear ditemukan.");
        clearBtn.addEventListener("click", clearChatHistory);
    } else {
        console.error("Button Clear tidak ditemukan!");
    }

    const userInput = document.getElementById("user-input");
    if (userInput) {
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    } else {
        console.error("Input user tidak ditemukan!");
    }

    // Memperbarui waktu setiap detik di Header
    updateHeaderTime();
    setInterval(updateHeaderTime, 1000);
});

function sendMessage() {
    console.log("Mengirim pesan...");
    const input = document.getElementById("user-input");
    if (input) {
        const userMessage = input.value.trim();
        if (userMessage) {
            addMessage(userMessage, "user");
            input.value = "";
        }
    }
}

function clearChatHistory() {
    console.log("Menghapus riwayat chat...");
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
        chatBox.innerHTML = "";
    }
}

function updateHeaderTime() {
    const headerTime = document.getElementById("header-time");
    if (headerTime) {
        const now = new Date();
        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        };
        headerTime.innerText = `Waktu Sekarang: ${now.toLocaleString('id-ID', options)}`;
    } else {
        console.error("Header Time tidak ditemukan!");
    }
}


// ---------------------- 🔹 Respons Kontekstual ----------------------

const keywordResponses = {
    teknologi: "Teknologi adalah masa depan. Ada teknologi apa yang ingin Anda ketahui?",
    sains: "Sains membantu kita memahami alam. Ada topik sains apa yang menarik minat Anda?",
    pendidikan: "Mari diskusikan topik pendidikan. Apa yang ingin Anda pelajari?"
};

const aiResponses = [
    "Tentu! Ada hal yang bisa saya bantu?",
    "Silakan jelaskan apa yang ingin Anda ketahui.",
    "Mari kita diskusikan hal ini lebih dalam.",
    "Apakah ada hal spesifik yang ingin Anda tanyakan?",
    "Iklan : Kamu udah follow ig @fizzx_404 belum?, kalau belum mending follow dulu buat liat web web menarik lainnya."
];

const userProfile = {
    name: "User",
    preferences: []
};

const faqDatabase = {
    "siapa ai": "Saya adalah chatbot yang siap membantu Anda.",
    "apa teknologi": "Teknologi adalah penerapan pengetahuan untuk mengubah kehidupan manusia.",
    "bagaimana dunia": "Dunia penuh misteri dan pengetahuan, mari jelajahi bersama!"
};

const chatLog = [];

// ---------------------- 🔹 Mengirim Pesan ----------------------

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
            let aiResponse = getKeywordResponse(userMessage) ||
                              getFAQResponse(userMessage) ||
                              generateAIResponse(userMessage);

            addMessage(aiResponse, "ai");

            logUserActivity(userMessage, aiResponse);
        }, 1000);
    }
}

// ---------------------- 🔹 Menggabungkan Pesan ke Chatbox ----------------------

function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerText = `${sender === "user" ? "User: " : "AI: "} ${text}`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ---------------------- 🔹 Keyword dan FAQ Response ----------------------

function getKeywordResponse(userText) {
    userText = userText.toLowerCase();
    for (const keyword in keywordResponses) {
        if (userText.includes(keyword)) {
            return keywordResponses[keyword];
        }
    }
    return null;
}

function getFAQResponse(userText) {
    for (const question in faqDatabase) {
        if (userText.includes(question)) {
            return faqDatabase[question];
        }
    }
    return null;
}

function generateAIResponse(userText) {
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    return aiResponses[randomIndex];
}

// ---------------------- 🔹 Menghapus Riwayat Chat Menggunakan SweetAlert ----------------------

function clearChatHistory() {
    Swal.fire({
        title: 'Konfirmasi Menghapus Chat',
        text: "Apakah Anda yakin ingin menghapus semua chat?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6200ea',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus'
    }).then((result) => {
        if (result.isConfirmed) {
            const chatBox = document.getElementById("chat-box");
            chatBox.innerHTML = "";
            Swal.fire('Chat telah dihapus!', '', 'success');
        }
    });
}

document.getElementById("clear-btn").addEventListener("click", clearChatHistory);

// ---------------------- 🔹 Logging Aktivitas Pengguna ----------------------

function logUserActivity(userMessage, aiResponse) {
    chatLog.push({
        user: userMessage,
        ai: aiResponse
    });
    console.log(chatLog);
}

// ---------------------- 🔹 Menampilkan Waktu di Header ----------------------

function updateHeaderTime() {
    const headerTime = document.getElementById("header-time");

    if (headerTime) {
        const now = new Date();
        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        };
        headerTime.innerText = `Waktu Sekarang: ${now.toLocaleString('id-ID', options)}`;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateHeaderTime();
    setInterval(updateHeaderTime, 1000);
});

function startTriviaGame() {
    console.log("Memulai Trivia Game...");

    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const selectedQuestion = triviaQuestions[randomIndex];

    console.log("Pertanyaan Trivia:", selectedQuestion.question);

    Swal.fire({
        title: selectedQuestion.question,
        input: 'text',
        confirmButtonText: 'Jawab',
        showCancelButton: true
    }).then((result) => {
        console.log("Hasil SweetAlert:", result);

        if (result.isConfirmed) {
            const userAnswer = result.value.trim();
            console.log("Jawaban Pengguna:", userAnswer);

            if (userAnswer.toLowerCase() === selectedQuestion.answer.toLowerCase()) {
                Swal.fire('Jawaban Benar!', '', 'success');
            } else {
                Swal.fire('Jawaban Salah!', `Jawaban yang benar adalah ${selectedQuestion.answer}`, 'error');
            }
        }
    });
}

function startGame() {
    // Mengarahkan ke halaman game atau memuat konten game di bawah chat
    window.location.href = 'game.html';
}

