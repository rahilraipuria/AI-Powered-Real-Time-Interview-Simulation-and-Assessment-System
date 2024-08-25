import 'dotenv/config';
import GoogleGenerativeAI from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
async function Qrelevancy(ques) {
  const prompt = `How difficult and relevant is the question: "${ques}" to networking? Provide a difficulty score between 0 to 100 (just return a number).`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
async function ACorrectness(ques, answer) {
  const prompt = `"Question: ${ques}" Answer: "${answer}".Provide 0 for non-relevancy and 100 for best relevancy(just return a number).`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

//Qrelevancy("Explain in short the differences between TCP and UDP protocols, including their reliability, connection orientation, and use cases.?");
//ACorrectness("Explain in short the differences between TCP and UDP protocols, including their reliability, connection orientation, and use cases.?","TCP (Transmission Control Protocol): Imagine TCP as a reliable postal service. It ensures that every letter (data packet) is delivered safely and in the correct order. It's like sending a registered letter with tracking, guaranteeing that it reaches its destination without any errors. TCP is perfect for applications that can't afford to lose data, such as file transfers or email.UDP (User Datagram Protocol): UDP is more like sending a postcard. It's fast and efficient, but there's no guarantee that it will reach its destination or arrive in the correct order. If a postcard gets lost in the mail, you won't know about it. UDP is ideal for applications where speed is more important than reliability, such as streaming video or online gaming.");

export {Qrelevancy,ACorrectness}