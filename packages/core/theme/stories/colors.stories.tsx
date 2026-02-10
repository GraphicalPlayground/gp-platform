/** Dependencies */
import { Meta } from '@storybook/react';
import { primary, secondary, tertiary, error, neutral, neutralVariant } from '../src/colors';
import { parseToRgba, readableColor } from 'color2k';

type ColorsItem = {
  color: string;
  className?: string;
  textClassName?: string;
};

type SwatchColors = {
  title: string;
  items: ColorsItem[];
};

type SwatchSetProps = {
  colors: SwatchColors[];
  isSemantic?: boolean;
};

const Swatch = ({ color }: { color: string }) => {
  const colorText = color
    ? `#${parseToRgba(color)
        .slice(0, 3)
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()}`
    : 'N/A';

  return (
    <div
      className='flex flex-col items-center justify-center w-24 h-24 m-2 rounded-xl shadow-lg'
      style={{ backgroundColor: color }}
    >
      <span style={{ color: readableColor(color) }}>{colorText}</span>
    </div>
  );
};

const SemanticSwatch = ({
  color,
  className,
  textClassName
}: {
  color: string;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <div className={`${className} flex flex-col items-center justify-center w-24 h-24 m-2 rounded-xl shadow-lg`}>
      <span className={`${textClassName} text-sm text-center`}>{color}</span>
    </div>
  );
};

const SwatchSet = ({ colors, isSemantic = false }: SwatchSetProps) => (
  <div className='flex flex-row flex-wrap items-center justify-center w-full h-full p-2'>
    {colors.map(({ title, items }) => (
      <div key={title} className='flex flex-col items-start w-full h-full'>
        <h2 className='text-xl font-bold text-on-background'>{title}</h2>
        <div className='flex flex-row flex-wrap items-center justify-start w-full h-full p-4'>
          {items.map((c, index) =>
            isSemantic ? (
              <SemanticSwatch
                key={`${c.color}-${index}`}
                className={c.className}
                color={c.color}
                textClassName={c.textClassName}
              />
            ) : (
              <Swatch key={`${c.color}-${index}`} color={c.color} />
            )
          )}
        </div>
      </div>
    ))}
  </div>
);

export default {
  title: 'Foundations/Colors',
  component: SwatchSet,
  argTypes: {
    isSemantic: {
      control: false
    }
  }
} as Meta<typeof SwatchSet>;

const getCommonItems = (colors: string[]) => {
  return colors.map((color) => ({
    color
  }));
};

export const CommonColors = {
  args: {
    colors: [
      {
        title: 'Primary',
        items: getCommonItems([...Object.values(primary).map((color) => color.hex())])
      },
      {
        title: 'Secondary',
        items: getCommonItems([...Object.values(secondary).map((color) => color.hex())])
      },
      {
        title: 'Tertiary',
        items: getCommonItems([...Object.values(tertiary).map((color) => color.hex())])
      },
      {
        title: 'Error',
        items: getCommonItems([...Object.values(error).map((color) => color.hex())])
      },
      {
        title: 'Neutral',
        items: getCommonItems([...Object.values(neutral).map((color) => color.hex())])
      },
      {
        title: 'Neutral Variant',
        items: getCommonItems([...Object.values(neutralVariant).map((color) => color.hex())])
      }
    ]
  }
};

export const SemanticColors = {
  args: {
    isSemantic: true,
    colors: [
      {
        title: 'Primary',
        items: [
          {
            color: 'primary',
            className: 'bg-primary',
            textClassName: 'text-on-primary'
          },
          {
            color: 'primary-container',
            className: 'bg-primary-container',
            textClassName: 'text-on-primary-container'
          },
          {
            color: 'primary-fixed',
            className: 'bg-primary-fixed',
            textClassName: 'text-on-primary-fixed'
          },
          {
            color: 'primary-fixed-variant',
            className: 'bg-primary-fixed-dim',
            textClassName: 'text-on-primary-fixed-variant'
          }
        ]
      },
      {
        title: 'Secondary',
        items: [
          {
            color: 'secondary',
            className: 'bg-secondary',
            textClassName: 'text-on-secondary'
          },
          {
            color: 'secondary-container',
            className: 'bg-secondary-container',
            textClassName: 'text-on-secondary-container'
          },
          {
            color: 'secondary-fixed',
            className: 'bg-secondary-fixed',
            textClassName: 'text-on-secondary-fixed'
          },
          {
            color: 'secondary-fixed-variant',
            className: 'bg-secondary-fixed-dim',
            textClassName: 'text-on-secondary-fixed-variant'
          }
        ]
      },
      {
        title: 'Tertiary',
        items: [
          {
            color: 'tertiary',
            className: 'bg-tertiary',
            textClassName: 'text-on-tertiary'
          },
          {
            color: 'tertiary-container',
            className: 'bg-tertiary-container',
            textClassName: 'text-on-tertiary-container'
          },
          {
            color: 'tertiary-fixed',
            className: 'bg-tertiary-fixed',
            textClassName: 'text-on-tertiary-fixed'
          },
          {
            color: 'tertiary-fixed-variant',
            className: 'bg-tertiary-fixed-dim',
            textClassName: 'text-on-tertiary-fixed-variant'
          }
        ]
      }
    ]
  }
};
