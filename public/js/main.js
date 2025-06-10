let translateButton = document.querySelector("#chat_button");

translateButton.addEventListener("click", async () => {

  let text = document.querySelector("#chat_input")
  let inputText = text.value.trim();

  let languageSelect = document.querySelector("#chat_select").value;

  if (!inputText || !languageSelect) {
    alert("Porfavor, escriba un texto a traducir y seleccione un idioma.");
    return false;
  }

  // Mostrar el mensaje del usuario en la interfaz
  const userMessage = document.createElement("div");
  userMessage.className = "chat_message chat_message--user";
  userMessage.textContent = inputText;

  const chatContainer = document.querySelector(".chat_messages");
  chatContainer.appendChild(userMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        language: languageSelect,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "La traducción falló.");
    }

    // Agregar mensaje traducido a la interfaz
    const botMessage = document.createElement("div");
    botMessage.className = "chat_message chat_message--bot";
    botMessage.textContent = data.translatedText;

    chatContainer.appendChild(botMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    text.value = "";
    console.log("Mensaje enviado:", inputText);
  } catch (error) {
    console.error("Error during translation:", error);
    alert("An error occurred while translating. Please try again.");
  }
});
