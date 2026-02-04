'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, List, Link2, ImageIcon, Heading2, Mail } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function NewsletterRichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.substring(start, end)
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end)

    onChange(newValue)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  const renderPreview = (content: string) => {
    return content
      .split('\n')
      .map((line, idx) => {
        if (line.startsWith('##')) {
          return <h2 key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>
        }
        if (line.startsWith('- ')) {
          return <li key={idx} className="text-white/80 ml-4">{line.replace('- ', '')}</li>
        }
        if (line.includes('[') && line.includes('](')) {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
          const text = line.replace(linkRegex, '<a href="$2" class="text-[#00C853] underline">$1</a>')
          return <p key={idx} dangerouslySetInnerHTML={{ __html: text }} className="text-white/80 mb-3" />
        }
        if (line.trim()) {
          return <p key={idx} className="text-white/80 mb-3">{line}</p>
        }
        return <div key={idx} className="mb-3" />
      })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('**', '**')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('_', '_')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('## ')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Heading"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('- ')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('[Link text](https://example.com)')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Link"
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('![Image](https://example.com/image.jpg)')}
          className="h-9 w-9 p-0 bg-transparent border-white/20"
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="bg-transparent border-white/20 text-xs"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {!isPreview && (
        <textarea
          id="content-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your newsletter content here...&#10;Use **text** for bold&#10;Use ## for headings&#10;Use - for bullet points&#10;Use [link text](url) for links&#10;Use ![image alt text](url) for images"
          className="w-full min-h-[300px] bg-white/5 border border-white/20 text-white rounded-lg p-4 font-mono text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00C853]"
        />
      )}

      {isPreview && (
        <div className="bg-white/5 border border-white/20 rounded-lg p-6 min-h-[300px]">
          <div className="max-w-2xl">{renderPreview(value)}</div>
        </div>
      )}
    </div>
  )
}
