# ZATCA Voice Agent - User Guide

## 🎯 What the Voice Agent Can Do

The intelligent voice assistant can:
- **Navigate** you to any ZATCA service
- **Play tutorial videos** automatically when showing steps
- **Fill forms** by asking you questions conversationally
- **Highlight** relevant UI elements
- **Switch languages** between Arabic and English
- **Check your login status** and guide you through authentication

## 🚀 Quick Start

### 1. Start the Application
```bash
npm run dev
```
- Client: http://localhost:5173
- Server: http://localhost:4000

### 2. Get an ElevenLabs API Key
- Go to https://elevenlabs.io/app/settings/api-keys
- Create a new API key
- Add to `server/.env`:
  ```
  ELEVENLABS_API_KEY=your_key_here
  ```

### 3. Start a Voice Conversation
1. Click the green microphone button (bottom-right)
2. Click "Start Voice"
3. Speak naturally!

## 💬 Example Conversations

### Information Seeking: "What are the steps to request an installment plan?"

**Agent Actions:**
1. ✅ Navigates to `/services/request-installment-plan`
2. ✅ Switches to "Steps" tab
3. ✅ Auto-plays the YouTube tutorial video
4. ✅ Explains: "Here are the 5 steps. Watch this video to see how it's done."

### Action Request: "Start the installment plan service for me"

**Agent Actions:**
1. ✅ Checks if you're logged in
2. ❌ If not → "You need to login first. Let me take you there." → Navigates to `/login`
3. ✅ After login → "Great! Now let me help you fill the form."
4. ✅ Navigates to `/services/request-installment-plan/submit`
5. ✅ Asks conversationally:
   - "What's your Tax ID number?"
   - "Which tax period?"
   - "Total amount due?"
   - "How many months for installments?"
6. ✅ As you answer, fills the form fields and highlights them
7. ✅ Moves through form steps automatically
8. ✅ When done: "Please review and click Submit"

### Form Filling Example
**You:** "Start the service for me"  
**Agent:** "I'll help you with that. First, what's your Tax Identification Number?"  
**You:** "3-0-0-1-2-3-4-5-6-7-8-9-0-1-2"  
**Agent:** *Fills TIN field* "Got it, 300123456789012. Which tax period is this for?"  
**You:** "Q1 2024"  
**Agent:** *Fills tax period* "Q1 2024 noted. What's the total amount you owe in SAR?"  
**You:** "Fifty thousand riyals"  
**Agent:** *Fills amount* "50,000 SAR. How many months do you need for installments?"  
**You:** "Six months"  
**Agent:** *Fills installments, moves to next step* "6 months it is. Now I need your contact email..."

## 🛠️ Available Voice Commands

### Navigation
- "Show me zakat services"
- "Open request installment plan"
- "Take me to the home page"
- "Go to services"

### Information
- "What are the steps for [service name]?"
- "What documents do I need?"
- "Who is eligible for this service?"
- "How much does it cost?"

### Actions
- "Start the service for me"
- "Fill the form"
- "Submit the request"
- "Play the video"

### Language
- "Switch to Arabic" (التبديل إلى العربية)
- "Change to English"

### Form Assistance
- "Help me fill this form"
- "What's this field for?"
- "Skip to step 3"
- "Review my data"

## 🔧 Agent Capabilities

### Tools the Agent Uses

| Tool | Purpose | Example |
|------|---------|---------|
| `navigateTo` | Go to any page | `/services`, `/login` |
| `openServiceBySlug` | Open service detail | `request-installment-plan` |
| `scrollToTab` | Switch tabs | `steps`, `eligibility` |
| `playVideo` | Auto-play tutorial | YouTube embed |
| `checkAuthStatus` | Verify login | Returns true/false |
| `getUserInfo` | Get user data | TIN, username |
| `fillFormField` | Populate form | `tin`, `amountDue` |
| `goToFormStep` | Navigate form steps | Step 1-4 |
| `highlightFormField` | Draw attention | Spotlights field |
| `submitForm` | Submit request | Final submission |
| `highlight` | Spotlight element | Any CSS selector |
| `setLanguage` | Switch language | `ar`, `en` |

### Entity Extraction

The agent automatically detects and extracts:
- **TIN numbers**: "3-0-0-1-2-3..." → `300123...`
- **Amounts**: "50k", "fifty thousand" → `50000`
- **Tax periods**: "Q1 2024", "first quarter" → `Q1-2024`
- **Installments**: "six months", "1 year" → `6` or `12`

## 📱 Bilingual Support

All agent interactions work in both languages:
- **English**: "What are the steps?"
- **Arabic**: "ما هي الخطوات؟"

The agent responds in the same language you speak.

## 🎨 UI Feedback

When the agent acts, you'll see:
- **Visual spotlight** on highlighted elements
- **Tab switching** with smooth scrolling
- **Form fields auto-filling** with values
- **Step progress indicators** updating
- **Live transcript** showing conversation

## 🔐 Authentication Flow

1. Some services require login (form submission)
2. Agent detects and guides you: "Please log in first"
3. After login, automatically returns to your task
4. Logout button appears in header when authenticated

## 📝 Current Services

1. **Request an Installment Plan** - Full form with 4 steps
2. **Zakat Return** - Service detail page
3. **Zakat Payment** - Service detail page  
4. **Request for Zakat Return Amendment** - Service detail page
5. **Holding Company Deregistration** - Service detail page
6. **Registering Holding Company** - Service detail page

All services have:
- Arabic + English translations
- RTL layout support
- Steps, Eligibility, Required Documents tabs
- Contact information sidebar

## 🐛 Troubleshooting

### Voice not working
- Grant microphone permission in browser
- Check `ELEVENLABS_API_KEY` in `server/.env`
- Try Chrome/Edge (best Web Speech API support)

### Agent not responding
- Check `OPENAI_API_KEY` in `server/.env`
- Check server logs for errors
- Verify WebSocket connection in DevTools

### Form not filling
- Make sure you're on the form page (`/services/:slug/submit`)
- Check browser console for tool execution logs
- Try saying field names explicitly: "My TIN is..."

## 🎓 Tips for Best Results

1. **Be specific**: "Start the installment plan service" works better than just "start service"
2. **Speak clearly**: Pause briefly between sentences
3. **Confirm understanding**: Agent will repeat back what it understood
4. **Use natural language**: No need for exact commands
5. **Check the transcript**: See what the agent heard in the dock

## 🌟 Demo Scenarios

Try these complete flows:

**Scenario 1: Learn About Service**
- Say: "What are the steps to request an installment plan?"
- Watch the agent navigate, switch tabs, and play the video

**Scenario 2: Complete Full Service**
- Say: "I want to submit an installment plan request"
- Follow the conversational form filling
- Provide: TIN, period, amount, installments, justification, bank info
- Review and submit

**Scenario 3: Mid-Flow Help**
- Navigate to a service manually
- Say: "Play the tutorial video"
- Or: "What documents do I need?"
- Agent assists contextually

## 🚀 Production Ready

All components are production-grade:
- ✅ Error boundaries and fallbacks
- ✅ Structured logging (Pino)
- ✅ No mock data (seeded from JSON)
- ✅ Bilingual (Arabic + English)
- ✅ RTL support
- ✅ Form validation
- ✅ Protected routes
- ✅ Smooth voice (ElevenLabs Flash)
- ✅ Fast STT (Web Speech API)
- ✅ Tool calling (OpenAI Chat)

Enjoy your ZATCA voice-enabled demo! 🎉








