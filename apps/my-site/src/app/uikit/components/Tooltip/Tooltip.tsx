'use client';
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  autoUpdate,
  flip,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { offset } from '@floating-ui/dom';
import { IconInfoCircle } from '@tabler/icons-react';

import style from './Tooltip.module.css';

const TooltipInfoIcon = forwardRef<HTMLSpanElement | null, unknown>(
  function InfoIcon(_, ref) {
    return (
      <span ref={ref} className={style.TooltipIcon}>
        <IconInfoCircle size={26} />
      </span>
    );
  }
);

export function useTooltipMedia() {
  const [infoIcon, setInfoIcon] = useState<ReactNode | null>(null);

  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;
    let handleTabletChange: ((e: MediaQueryListEvent) => void) | null = null;
    mediaQuery = window.matchMedia('(min-width: 768px)');

    handleTabletChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setInfoIcon(null);
      } else {
        setInfoIcon(<TooltipInfoIcon />);
      }
    };

    mediaQuery.addEventListener('change', handleTabletChange);

    // FIXME: don't use "as unknown"
    handleTabletChange(mediaQuery as unknown as MediaQueryListEvent);

    return () => {
      if (mediaQuery && handleTabletChange) {
        mediaQuery.removeEventListener('change', handleTabletChange);
      }
    };
  }, []);

  return {
    infoIcon,
  };
}

type TooltipProps = {
  children: ReactNode;
  text: string;
  infoIcon?: ReactNode;
};

export const Tooltip: FC<TooltipProps> = ({ children, text, infoIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      {Children.map(Children.toArray(children), (child, i) => {
        if (isValidElement(child)) {
          let updatedElement = child;
          if (infoIcon) {
            infoIcon = cloneElement(infoIcon as ReactElement, {
              // @ts-ignore
              ref: refs.setReference,
              ...getReferenceProps(),
            });
          } else {
            updatedElement = cloneElement(child, {
              // @ts-ignore
              ref: refs.setReference,
              ...getReferenceProps(),
            });
          }

          return (
            <span className={style.TooltipWithIcon}>
              {updatedElement}
              {infoIcon}
            </span>
          );
        }
        return '';
      })}
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: '300px',
            border: '1px solid black',
            borderRadius: '8px',
            background: 'white',
            padding: '8px',
          }}
          {...getFloatingProps()}
        >
          {text}
        </div>
      )}
    </>
  );
};
