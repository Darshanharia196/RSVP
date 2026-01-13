import React from 'react';

/**
 * FormattedText Component
 * Renders text with:
 * 1. Newlines preserved (converted to <br/>)
 * 2. Bold text parsed from **text** syntax
 */
export default function FormattedText({ text, className = '' }) {
    if (!text) return null;

    // First, split by newlines
    const lines = text.split('\n');

    return (
        <span className={className}>
            {lines.map((line, lineIndex) => {
                // For each line, parse bold syntax **text**
                const parts = line.split(/(\*\*.*?\*\*)/g);

                const renderedLine = parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                    }
                    return <span key={partIndex}>{part}</span>;
                });

                return (
                    <React.Fragment key={lineIndex}>
                        {renderedLine}
                        {lineIndex < lines.length - 1 && <br />}
                    </React.Fragment>
                );
            })}
        </span>
    );
}
