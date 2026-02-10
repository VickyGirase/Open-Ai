 import dotenv from "dotenv";
 dotenv.config();
 import OpenAI from "openai";

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY

});
 
export async function createTemplateWithAI(paragraph) {
 
  const response = await openai.chat.completions.create({

    model: "gpt-4.1-mini",

    temperature: 0.1, // very strict

    messages: [

      {

        role: "system",

        content: `

You are generating WhatsApp Business templates strictly following

Meta WhatsApp Template Guidelines for UTILITY category.
 
Rules:

- Informational or transactional only

- No promotions or marketing language

- No offers, discounts, or sales intent

- No emojis

- Neutral tone

- Predictable structure

- Detect ALL dynamic values

- Replace them with snake_case variables

- Return ONLY valid JSON

`

      },

      {

        role: "user",

        content: `

Convert the following message into a Meta-approved WhatsApp

UTILITY template.
 
Message:

${paragraph}

`

      }

    ]

  });
 
  return JSON.parse(response.choices[0].message.content);

}

 