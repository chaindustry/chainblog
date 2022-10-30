import React from "react";
import PropTypes from "prop-types";
import classes from "./appbutton.module.css";

/**
 *
 * @param {{
 * sxclass: unknown,
 * size: "sm" | "md" | "lg";
 * label: string;
 * icon: object;
 * fullWidth: boolean;
 * extrapad: boolean;
 * disabled: boolean;
 * loading: boolean;
 * variant: "primary" | "secondary" | "tertiary" | "ghost" | "lightPrimary" | "lightSecondary" | "lightTertiary";
 * iconVariant: "Outline" | "Bold" | "Bulk" | "TwoTone" | "Linear"
 * }} props Props for the button component
 *
 */

const AppButton = ({
  label,
  variant,
  sxclass,
  icon,
  loading,
  disabled,
  size,
  iconVariant,
  children,
  fullWidth,
  extrapad,
  ...props
}) => {
  return (
    <button
      {...props}
      data-extrapad={extrapad}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled}
      data-icon={icon && true}
      className={`${classes.btn} ${sxclass}`}
      data-icon-only={icon && !label}
      data-fullwidth={fullWidth}
    >
      {icon &&
        React.createElement(icon, {
          size: size === "lg" ? 20 : size === "sm" ? 16 : 18,
          variant: iconVariant,
        })}
      {label}
      {children}
    </button>
  );
};
AppButton.defaultProps = {
  variant: "primary",
  label: "Button",
  loading: false,
  disabled: false,
  size: "md",
  iconVariant: "Outline",
};
AppButton.propTypes = {
  label: PropTypes.string,
  extrapad: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "ghost",
    "lightPrimary",
    "lightSecondary",
    "lightTertiary",
  ]),
  fullWidth: PropTypes.bool,
  icon: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  // sxclass: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
export default AppButton;
