export function getConfig() {
  return {
    AZURE_FOUNDRY_ENDPOINT: process.env.AZURE_FOUNDRY_ENDPOINT || '',
    AZURE_FOUNDRY_API_KEY: process.env.AZURE_FOUNDRY_API_KEY || '',
    FOUNDRY_IQ_ENDPOINT: process.env.FOUNDRY_IQ_ENDPOINT || '',
    FOUNDRY_IQ_KEY: process.env.FOUNDRY_IQ_KEY || ''
  }
}
