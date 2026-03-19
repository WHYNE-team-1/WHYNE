import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import styles from "./index.module.css";

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger?: ReactNode;
  options: DropdownOption[];
  offset?: number;
}

export default function Dropdown({
  trigger,
  options,
  offset = 26,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (onClickCallback: () => void) => {
    onClickCallback();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button onClick={handleToggle}>{trigger}</button>

      {isOpen && (
        <ul className={styles.menu} style={{ top: `calc(100% + ${offset}px)` }}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.menuItem}
              onClick={() => handleOptionClick(option.onClick)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
