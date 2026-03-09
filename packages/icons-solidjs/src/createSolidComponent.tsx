import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { JSX } from 'solid-js/jsx-runtime';
import defaultAttributes from './defaultAttributes';
import { IconNode, IconProps } from './types';

type InternalIconProps = Omit<IconProps, 'stroke'> & {
  stroke?: string | number;
};

const createSolidComponent = (
  type: 'outline' | 'filled',
  iconName: string,
  iconNamePascal: string,
  iconNode: IconNode,
) => {
  const Component = (props: IconProps): JSX.Element => {
    const [localProps, rest] = splitProps(props as InternalIconProps, [
      'color',
      'size',
      'stroke',
      'title',
      'children',
      'class'
    ]),
      attributes = defaultAttributes[type];

    return (
      <svg
        {...attributes}
        width={localProps.size != null ? localProps.size : attributes.width}
        height={localProps.size != null ? localProps.size : attributes.height}
        {...(type === 'filled'
          ? {
              fill: localProps.color != null ? localProps.color : 'currentColor',
            }
          : {
              stroke: localProps.color != null ? localProps.color : 'currentColor',
              'stroke-width':
                localProps.stroke != null ? localProps.stroke : attributes['stroke-width'],
            })}
        class={`tabler-icon tabler-icon-${iconName} ${localProps.class != null ? localProps.class : ''}`}
        {...rest}
      >
        {localProps.title && <title>{localProps.title}</title>}
        {iconNode.map(([tag, attrs]) => (
          <Dynamic component={tag} {...attrs} />
        ))}
        {localProps.children}
      </svg>
    );
  };

  Component.displayName = `${iconNamePascal}`;
  return Component;
};

export default createSolidComponent;
