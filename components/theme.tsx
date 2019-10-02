import React from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { hideVisually } from 'polished';

export type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC<{ open: boolean; closeModal: VoidFunction }> = ({
  open,
  closeModal,
}) => {
  const [theme, setTheme] = React.useState<Theme>('system');

  const pickTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Theme;
    setTheme(value);
    if (value === 'system') {
      localStorage.removeItem('reddit-theme');
    } else {
      localStorage.setItem('reddit-theme', value);
    }
    document.querySelector('html')!.className = value;
  };

  return (
    <DialogOverlay
      isOpen={open}
      onDismiss={closeModal}
      css={{
        display: 'flex',
        margin: '0',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 101,
      }}
    >
      <DialogContent
        css={`
          @media (max-width: 500px) {
            width: 80%;
            max-width: 800px;
          }
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          h2 {
            margin-bottom: 1rem;
            font-size: 2rem;
            font-weight: normal;
          }

          label {
            margin: 0 1rem;

            span {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              font-size: 1.6rem;
            }

            span::before {
              content: '';
              height: 1rem;
              width: 1rem;
              background: none;
              border: 1px solid black;
              border-radius: 50%;
              display: inline-block;
              margin-right: 0.5rem;
            }

            input {
              ${hideVisually()};
            }

            input:checked + span::before {
              background: black;
            }
          }
        `}
      >
        <button
          onClick={closeModal}
          type="button"
          css={`
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.4rem;
            border: none;
            background: none;
          `}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <h2>Select a theme</h2>

        <div>
          <label htmlFor="system">
            <input
              checked={theme === 'system'}
              type="radio"
              name="theme"
              value="system"
              id="system"
              onChange={pickTheme}
            />

            <span>System</span>
          </label>
          <label htmlFor="light">
            <input
              checked={theme === 'light'}
              type="radio"
              name="theme"
              value="light"
              id="light"
              onChange={pickTheme}
            />
            <span>Light</span>
          </label>
          <label htmlFor="dark">
            <input
              checked={theme === 'dark'}
              type="radio"
              name="theme"
              value="dark"
              id="dark"
              onChange={pickTheme}
            />
            <span>Dark</span>
          </label>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export { ThemeToggle };
