# ZATCA Voice Agent Demo

Voice-enabled chatbot for ZATCA (Zakat, Tax and Customs Authority) services with Arabic + English support.

## Architecture

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Express + TypeScript + WebSocket
- **Voice Stack**:
  - **STT**: Browser Web Speech API (continuous recognition, Arabic + English)
  - **Agent**: OpenAI Chat API with streaming + function calling
  - **TTS**: ElevenLabs streaming API (high-quality voices)
  - **Transport**: WebSocket for real-time bidirectional communication

## Features

- ✅ Voice-first UI with continuous speech recognition
- ✅ Arabic + English support with RTL/LTR switching
- ✅ Agent can navigate UI and highlight elements via tool calling
- ✅ Live transcript with interim results
- ✅ Streaming responses (low latency ~400-600ms)
- ✅ Service catalog with detail pages
- ✅ Production-ready logging and error boundaries

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `server/.env` from `server/.env.example`:

```bash
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# ElevenLabs
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_MODEL=eleven_turbo_v2_5
```

**Get API keys:**
- OpenAI: https://platform.openai.com/api-keys
- ElevenLabs: https://elevenlabs.io/app/settings/api-keys

### 3. Run development servers

```bash
npm run dev
```

This starts:
- Client (Vite): http://localhost:5173
- Server (Express + WebSocket): http://localhost:4000

## Usage

1. Open http://localhost:5173
2. Click the green mic button (bottom-right)
3. Click "Start Voice"
4. **Speak naturally** (e.g., "How can I submit to Zakat service?")
5. The assistant will:
   - Transcribe your speech
   - Respond with voice
   - Navigate to relevant pages
   - Highlight UI elements

### Example commands

- English: "Open request installment plan"
- Arabic: "افتح خدمة الزكاة"
- "Switch to Arabic" / "Switch to English"
- "Show me tax services"

## Agent Tools

The voice agent can call these functions:

- `navigateTo(path)` - Navigate to any route
- `openServiceBySlug(slug)` - Open service detail page
- `highlight(selector, seconds)` - Spotlight UI elements
- `setLanguage(lang)` - Switch Arabic/English

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (headers, cards, sidebars)
│   │   ├── pages/          # Routes (Home, Services, ServiceDetail)
│   │   ├── features/
│   │   │   ├── voice/      # Speech recognition, WebSocket, audio queue
│   │   │   └── agent/      # Tool registry, spotlight, navigator
│   │   ├── i18n/           # Arabic + English translations
│   │   └── store/          # Zustand state management
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API endpoints + WebSocket
│   │   ├── services/       # Agent logic, TTS integration
│   │   ├── data/           # Service catalog JSON
│   │   └── logger.ts       # Pino structured logging
│   └── package.json
│
└── package.json            # Root scripts (dev, build, start)
```

## Browser Compatibility

- **Web Speech API**: Chrome, Edge, Safari (requires `webkit` prefix)
- **WebSocket**: All modern browsers
- **Audio playback**: All modern browsers

**Note**: Web Speech API works best in Chrome/Edge.

## Adding New Services

1. Edit `server/src/data/services.json`
2. Add entry with `id`, `slug`, `title`, `summary`, `badges`, `steps`, `eligibility`, `requiredDocuments`, `meta`
3. Service card will appear automatically in `/services`
4. Detail page will render at `/services/{slug}`

## Troubleshooting

### No voice output
- Check `server/.env` has valid `ELEVENLABS_API_KEY`
- Check browser console for errors
- Verify system audio isn't muted

### Speech recognition not working
- Grant microphone permission in browser
- Check system microphone is working
- Try Chrome/Edge (best Web Speech API support)
- Check Windows microphone privacy settings

### Agent not responding
- Check `server/.env` has valid `OPENAI_API_KEY`
- Check server logs for errors
- Verify WebSocket connection in browser DevTools → Network → WS

## Production Deployment

```bash
npm run build
npm run start
```

Serves optimized client + API on port 4000.

## License

MIT
