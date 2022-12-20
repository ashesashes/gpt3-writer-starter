import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OpenAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";
const generateAction = async (req, res) => {
  //logging errors
  try {

  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
} catch (error) {
  res.status(500).json({ error: error.message });
  }
};

export default generateAction;