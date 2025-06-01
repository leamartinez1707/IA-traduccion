let translateButton = document.querySelector("translate-button");

translateButton.addEventListener("click", async () => {
  let inputText = document.querySelector("message-input");
  let messageInput = inputText.value.trim();

  let languageSelect = document.querySelector("select-language");

  if (!messageInput.value || !languageSelect.value) {
    alert("Porfavor, escriba un texto a traducir y seleccione un idioma.");
    return false;
  }

  // Mostrar el mensaje del usuario en la interfaz
  const userMessage = document.createElement("p");
  userMessage.className = "chat_message chat_message--user";
  userMessage.textContent = messageInput.value;
  const chatContainer = document.querySelector("chat_messages");
  chatContainer.appendChild(userMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    // const response = await fetch("/api/translate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     text: messageInput.value,
    //     language: languageSelect.value,
    //   }),
    // });

    // const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "La traducción falló.");
    }

    // Agregar mensaje traducido a la interfaz
    const botMessage = document.createElement("p");
    botMessage.className = "chat_message chat_message--bot";
    botMessage.textContent = data.translatedText;

    chatContainer.appendChild(botMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    console.error("Error during translation:", error);
    alert("An error occurred while translating. Please try again.");
  } finally {
    // Limpiar el campo de entrada después de enviar el mensaje
    inputText.value = "";
  }
});
