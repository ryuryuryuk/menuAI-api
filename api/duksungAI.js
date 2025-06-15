import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
    const allowedOrigin = "https://ryuryuryuk.github.io"

    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    const { mood, weather, alone, type } = req.body;
    if (!mood|| !weather|| !alone|| !type) {
        return res
        .status(400)
        .json({ error: "응답이 필요합니다." });
    }

    /*const mood = '속상해'
    const weather = '비가 옴'
    const alone = '같이'
    const type = '국물요리'*/

    try {
        const today = new Date().toISOString().slice(0, 10);

        const prompt = `
    기분: ${mood}
    날씨: ${weather}
    혼밥 여부: ${alone}
    원하는 음식 유형 : ${type}}
    당신은 친절하고 마음이 따뜻한 영양사입니다. 이 사람 조건에 잘 맞는 메뉴를 한 가지 추천해주세요. 추천한 이유를 함께 설명해주고, 그게 어떻게 도움이 될 지 응원이나 위로와 함께 적어주세요. 너무 길지 않게 300자 이내로 적어주세요. 
    `;


    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
        systemInstruction:
            "당신은 감성적인 식사 추천 전문가입니다. 사용자의 기분, 날씨, 상황에 따라 마음을 위로하거나 즐겁게 해 줄 음식을 추천하세요. 음식 이름과 짧은 설명을 포함해주세요.",
        },
    });


    res.status(200).json({ answer: result.text });
    } catch (err) {
    console.error("Gemini 오류:", err);
    res.status(500).json({ error: "Gemini API 오류 발생" });
    }
}
