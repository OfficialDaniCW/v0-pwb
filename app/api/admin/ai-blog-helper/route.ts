import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt, currentContent } = await request.json()
    
    // In production, integrate with AI service (OpenAI, Anthropic, etc.)
    // For now, return a helpful template response
    
    const templates = {
      moss: `## Understanding Moss Growth on Your Property

Moss thrives in damp, shaded conditions - exactly what Purbeck's coastal climate provides. While it might look harmless, moss is actively damaging your property:

**How Moss Damages Surfaces:**
- Retains moisture against surfaces, accelerating deterioration
- Root structures penetrate into porous materials like concrete and render
- Creates slip hazards on patios and pathways
- Lifts and displaces pointing in brickwork

**Prevention Tips:**
- Improve drainage around affected areas
- Trim back overhanging vegetation to increase sunlight
- Regular biocide treatments (our PowerUps Bio-Clean)
- Annual professional inspections`,
      
      purbeck: `## Caring for Purbeck Properties

Living in Purbeck means dealing with unique challenges for property maintenance:

**Coastal Climate Challenges:**
- Salt-laden air accelerates weathering of exterior surfaces
- High humidity encourages moss and algae growth year-round
- Strong winds carry more organic debris onto roofs and gutters
- Heritage buildings require specialist gentle cleaning approaches

**Our Local Expertise:**
Based in Swanage, we understand these challenges firsthand. Our PowerUps treatments are specifically formulated for Purbeck's coastal conditions.`,
      
      default: `This section will contain AI-generated content based on your prompt. The AI can help with:
- Writing detailed explanations
- Creating how-to guides
- Expanding on technical topics
- Generating property care tips

Please provide a more specific prompt for better results.`
    }
    
    // Simple keyword matching for demo purposes
    let generatedContent = templates.default
    
    if (prompt.toLowerCase().includes('moss')) {
      generatedContent = templates.moss
    } else if (prompt.toLowerCase().includes('purbeck') || prompt.toLowerCase().includes('swanage')) {
      generatedContent = templates.purbeck
    }
    
    // In production, you would call an actual AI API here:
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [
    //     { role: "system", content: "You are a property maintenance expert..." },
    //     { role: "user", content: prompt }
    //   ]
    // })
    // generatedContent = response.choices[0].message.content
    
    return NextResponse.json({ 
      content: generatedContent,
      success: true 
    })
  } catch (error) {
    console.error('AI helper error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content', success: false }, 
      { status: 500 }
    )
  }
}
