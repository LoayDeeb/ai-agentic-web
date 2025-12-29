import React from 'react';
import { cn } from '../../lib/utils';
interface LogoLinkProps {
  className?: string;
  href?: string;
  imageUrl?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  float?: 'left' | 'right' | 'none';
}

/**
 * LogoLink component that recreates the Jerusalem Insurance logo element.
 * Designed to be reusable with configurable dimensions and alignment.
 */

// @component: LogoLink
export const LogoLink = ({
  className,
  href = "#",
  imageUrl = "https://jico.jo/wp-content/themes/jico/images/Jerusalem-Insurance-2024-2.png",
  width = 232,
  height = 56,
  alt = "Jerusalem Insurance Logo",
  float = "right"
}: LogoLinkProps) => {
  // Styles based on the extracted CSS requirements
  const containerStyle: React.CSSProperties = {
    color: 'rgb(75, 75, 75)',
    cursor: 'pointer',
    display: 'block',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundImage: `url("${imageUrl}")`,
    backgroundPositionX: '0px',
    backgroundPositionY: '0px',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundOrigin: 'padding-box',
    backgroundClip: 'border-box',
    backgroundSize: 'contain',
    float: float,
    margin: '19px 0px',
    textDecoration: 'none',
    boxSizing: 'border-box'
  };

  // @return
  return <a href={href} onClick={e => e.preventDefault()} className={cn("logo transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", className)} style={containerStyle} aria-label={alt} title={alt}>
      <span className="sr-only">{alt}</span>
    </a>;
};

