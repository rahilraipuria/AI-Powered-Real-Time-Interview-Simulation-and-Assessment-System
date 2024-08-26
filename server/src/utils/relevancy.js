import {GoogleGenerativeAI} from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//const model = genAI.getGenerativeModel({ model: "gemini-pro"});
async function Qrelevancy(ques,role) {
  const prompt = `How difficult and relevant is the question: "${ques}" to "${role}"? Provide a relevancy score between 0 to 100. Just return a number,dont return any text.`;
  const result = await model.generateContent(prompt);
  const response =  result.response;
  const text = response.text();
  console.log(`Question Relevancy:${text}`);
  return text
  
}
async function ACorrectness(ques, answer) {
  const prompt = `"Question: ${ques}" Answer: "${answer}".Provide 0 for non-relevancy and 100 for best relevancy.Just return a number,dont return any text.`;
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(`Response Relevancy:${text}`);
  return text
  
}

//Qrelevancy("Explain in short the differences between TCP and UDP protocols, including their reliability, connection orientation, and use cases.?");
//ACorrectness("Explain in short the differences between TCP and UDP protocols, including their reliability, connection orientation, and use cases.?","TCP (Transmission Control Protocol): Imagine TCP as a reliable postal service. It ensures that every letter (data packet) is delivered safely and in the correct order. It's like sending a registered letter with tracking, guaranteeing that it reaches its destination without any errors. TCP is perfect for applications that can't afford to lose data, such as file transfers or email.UDP (User Datagram Protocol): UDP is more like sending a postcard. It's fast and efficient, but there's no guarantee that it will reach its destination or arrive in the correct order. If a postcard gets lost in the mail, you won't know about it. UDP is ideal for applications where speed is more important than reliability, such as streaming video or online gaming.");

export {Qrelevancy,ACorrectness}