# PreMortem AI - Hackathon MVP

Next.js 15 + TypeScript + Tailwind CSS starter for PreMortem AI.

Run:

npm install
npm run dev

Navigate to / and click "Analyze My Plan".

Azure AI Foundry integration

- Configure environment variables by copying `.env.example` to `.env.local` and filling in values.
- The code will use Azure Foundry when `AZURE_FOUNDRY_ENDPOINT` and `AZURE_FOUNDRY_API_KEY` are present; otherwise it falls back to a local mock for fast local dev.

Environment variables (see .env.example):
- AZURE_FOUNDRY_ENDPOINT - base URL for the Foundry agent service
- AZURE_FOUNDRY_API_KEY - API key for the Foundry service
- FOUNDRY_IQ_ENDPOINT - optional Foundry IQ endpoint for retrieval
- FOUNDRY_IQ_KEY - API key for Foundry IQ

Security: do NOT commit real keys. Use your hosting provider (Vercel/Azure) environment settings.

Implementation notes:
- lib/ai/azureAgent.ts contains the service adapter to call Azure Foundry and Foundry IQ.
- lib/agent.ts is the single export used by API routes; it will call Azure when available.

Replace mock logic in lib/ai/azureAgent.ts with official SDK calls when integrating production credentials.
