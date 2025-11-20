const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export const sendMessageToAI = async (messages) => {
  try {
    // Check if API key exists
    if (!GROQ_API_KEY) {
      throw new Error('Please add VITE_GROQ_API_KEY to your .env file')
    }

    // Format messages for API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    console.log('Sending to Groq API...', formattedMessages)

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Groq API Error:', error)
      throw new Error(error.error?.message || 'API request failed')
    }

    const data = await response.json()
    console.log('Groq API Response:', data)
    
    return data.choices[0].message.content

  } catch (error) {
    console.error('Error calling Groq API:', error)
    
    // Return user-friendly error message
    if (error.message.includes('API key') || error.message.includes('env')) {
      return '❌ API key not configured. Please add VITE_GROQ_API_KEY to your .env file and restart the server.'
    }
    
    if (error.message.includes('rate limit')) {
      return '⏳ Rate limit reached. Please wait a moment and try again.'
    }
    
    return `❌ Sorry, I couldn't process your request. Error: ${error.message}`
  }
}
