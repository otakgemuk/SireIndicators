import { readFileSync } from 'fs';
import { join } from 'path';

export default function BPAMixedV2Page() {
  const htmlPath = join(process.cwd(), 'docs', 'BPA-Mixed-v2-Outside-Bar-Toolkit.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');
  
  // Extract body content from the HTML
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
  
  // Extract style content
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const styleContent = styleMatch ? styleMatch[1] : '';

  return (
    <div dangerouslySetInnerHTML={{ __html: `<style>${styleContent}</style>${bodyContent}` }} />
  );
}
