import { type SVGProps } from 'react';

import spriteHref from '@assets/icons/sprite.svg';

import { type IconId } from './icon-types';

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconId;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      {...props}
    >
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
