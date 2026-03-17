export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string;
}

export class XerdoxService {
  async sendMessage(text: string, imageBase64?: string): Promise<string> {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const lowerText = text.toLowerCase();

    if (imageBase64) {
      return "Whoa, nice pic bestie! 📸 Main abhi permanent offline mode mein hoon isliye image scan nahi kar sakta, par tum text mein bata sakte ho ki isme kya hai? Main solve karne ki poori koshish karunga! ⚡";
    }

    // Basic Math Evaluation (simple regex for basic arithmetic)
    try {
      const mathMatch = text.match(/^[\d\s\+\-\*\/\(\)\.]+$/);
      if (mathMatch && text.trim().length > 0) {
        // Safe eval using Function
        const result = new Function(`return ${text}`)();
        if (result !== undefined && !isNaN(result)) {
          return `Here is the calculation bestie! 📝\n\n**Expression:** \`${text}\`\n**Result:** \`${result}\`\n\nEasy peasy! Aur kuch solve karna hai? ⚡`;
        }
      }
    } catch (e) {
      // Ignore eval errors
    }

    if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      return "Hello Bestie! 👋 Main XERDOX AI hoon. Aaj kya padhna hai? Math, Coding, ya kuch aur? ⚡";
    }

    if (lowerText.includes('who are you') || lowerText.includes('tum kaun ho') || lowerText.includes('creator')) {
      return "Main XERDOX AI hoon, the brain behind XERDOX STUDY! 🧠 Mujhe Ravi ne specially tumhare liye design kiya hai. Main permanently offline mode mein hoon, isliye bina internet ya API ke bhi hamesha tumhare liye kaam karunga! ✅";
    }

    if (lowerText.includes('math') || lowerText.includes('solve') || lowerText.includes('calculate')) {
      return "Math problem? 📝\n\nSince I'm running in permanent offline mode, I can calculate basic arithmetic directly (just type `25 * 4` etc.). For complex calculus or algebra, here's a general approach:\n1. **Identify the given values**.\n2. **Apply the relevant formula**.\n3. **Solve step-by-step**.\n\nYou've got this! ⚡";
    }

    if (lowerText.includes('code') || lowerText.includes('programming') || lowerText.includes('react') || lowerText.includes('python')) {
      return "Coding query detected! 💻\n\n```javascript\n// Here's a quick tip for your code:\nconsole.log('Keep coding, Bestie! You are doing great!');\n```\n\nMain abhi offline logic mode mein hoon, but remember to check your syntax and keep your functions pure! ✅";
    }

    if (lowerText.includes('thanks') || lowerText.includes('thank you') || lowerText.includes('shukriya')) {
      return "You're welcome bestie! ❤️ Hamesha yahin hoon tumhari help ke liye. Aur kuch chahiye toh batao! ⚡";
    }

    const responses = [
      "Hmm, interesting! 🤔 Main abhi permanent offline mode mein hoon, isliye deep analysis nahi kar sakta, par tumhara question note kar liya hai! 📝",
      "Sahi baat hai! Aur batao, padhai kaisi chal rahi hai? 📚",
      "Main XERDOX AI hoon, hamesha tumhare saath! ⚡ Agar koi specific math calculation hai toh direct numbers type karo.",
      "Got it! ✅ Offline mode activated, so I'm giving you my best pre-programmed advice: Keep studying and stay awesome! 🌟"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
