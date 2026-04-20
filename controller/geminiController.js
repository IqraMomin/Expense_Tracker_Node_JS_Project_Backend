const genai = require("@google/genai");

const getCategoriesUsingAI = async(req,res)=>{
    const {prompt} = req.body;
    const newPrompt = `
    Classify this expense into one category:
    Food, Travel, Shopping, Bills, Entertainment.
    
    Expense: "${prompt}"
    
    Answer with only one word.
    `
    const ai = new genai.GoogleGenAI({
        apiKey:process.env.GEMINI_API_KEY
    });
    const responsefromAI =await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:newPrompt
    })
    console.log(responsefromAI.text);
    return res.status(200).json({category:responsefromAI.text});

}

module.exports = {getCategoriesUsingAI}