import Image from 'next/image'

export const CustomMDXRenderer = ({ content }: { content: string }) => {
  const [mainContent, noteContent] = content.split('---')

  return (
    <div className="typography">
      {mainContent.split('\n').map((line, index) => {
        if (line.startsWith('##')) {
          return <h2 key={index}>{line.replace('## ', '')}</h2>
        }
        if (line.startsWith('![image]')) {
          const src = line.match(/\((.*?)\)/)?.[1] || ''
          return (
            <div
              key={index}
              className="group isolate my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6"
            >
              <div className="group relative">
                <Image
                  alt=""
                  src={src}
                  width={2400}
                  height={1600}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>
          )
        }
        return <p key={index}>{line}</p>
      })}

      {noteContent && (
        <div className="mt-8 border-l-4 border-neutral-300 bg-neutral-100 p-4">
          {noteContent
            ?.trim()
            ?.replace(/\*\*$/, '')
            ?.split('\n')
            .map((noteLine, noteIndex) => (
              <p key={noteIndex} className="font-display text-sm">
                {noteLine.replace('**', '')}
              </p>
            ))}
        </div>
      )}
    </div>
  )
}
