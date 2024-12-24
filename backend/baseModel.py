from mlx_lm import load, generate

class BaseModel:
    def __init__(self, model_name="mlx-community/Llama-3.1-Tulu-3-8B-8bit"):
        self.model, self.tokenizer = load(model_name)

    def generate_response(self, system_prompt="", user_prompt="", context=""):
        # Construct the messages list for the chat template
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        if context:
            messages.append({"role": "system", "content": context})
        if user_prompt:
            messages.append({"role": "user", "content": user_prompt})

        if hasattr(self.tokenizer, "apply_chat_template") and self.tokenizer.chat_template is not None:
            # Apply the chat template
            prompt = self.tokenizer.apply_chat_template(
                messages, tokenize=False, add_generation_prompt=True
            )
        else:
            # Fallback if apply_chat_template is not available
            prompt = "\n".join([msg["content"] for msg in messages])

        # Generate a response
        response = generate(self.model, self.tokenizer, prompt=prompt, verbose=True)
        return response.strip()
