import React from "react";
import {
  Pressable,
  Text,
  FormControl,
  Input,
  Button,
  Heading,
  Card,
  TextArea,
  Select,
  HStack,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { THEME_COLORS } from "../config/constants.js";

export const NxtHeading = ({
  text,
  size = "lg",
  fontWeight = "600",
  color = THEME_COLORS.PRIMARY_COLOR,
  children,
  ...props
}) => {
  return (
    <Heading {...props} size={size} fontWeight={fontWeight} color={color}>
      {text}
      {children}
    </Heading>
  );
};

export const NxtCard = ({
  padding = "3",
  width = "100%",
  maxWidth = "350",
  alignSelf = "center",
  bg = "#fff",
  shadowColor = THEME_COLORS.PRIMARY_COLOR,
  children,
  ...props
}) => {
  return (
    <Card
      {...props}
      p={padding}
      w={width}
      maxW={maxWidth}
      bg={bg}
      style={{ shadowColor, borderWidth: 0 }}
    >
      {children}
    </Card>
  );
};

export const NxtLink = ({
  text,
  fontSize = "xs",
  fontWeight = "medium",
  ...props
}) => (
  <Pressable {...props}>
    <Text color="indigo.500" fontWeight={fontWeight} fontSize={fontSize}>
      {text}
    </Text>
  </Pressable>
);

export const NxtInput = ({
  label,
  type,
  placeholder,
  values,
  errors,
  touched,
  name,
  required = false,
  children,
  textArea,
  color = "coolGray.400",
  fontSize = 14,
  handleBlur,
  handleChange,
  select,
  selectOptions,
  ...props
}) => {
  const defaultProps = {
    type,
    name,
    placeholder,
    required,
    mt: 1,
    borderColor: THEME_COLORS.PRIMARY_COLOR,
    borderRadius: 10,
    onBlur: handleBlur(name),
    onChangeText: handleChange(name),
    value: values[name],
  };
  const isInvalid = !!touched[name] && !!errors[name];

  return (
    <FormControl isRequired={required} isInvalid={isInvalid}>
      <FormControl.Label>
        <Text color={color} fontSize={fontSize}>
          {label}{" "}
        </Text>
      </FormControl.Label>

      {!textArea && !select && <Input {...props} {...defaultProps} />}
      {textArea && <TextArea {...defaultProps} {...props} />}
      {select && (
        <Select
          {...defaultProps}
          {...props}
          onValueChange={handleChange(name)}
          selectedValue={values[name]}
        >
          {selectOptions &&
            selectOptions.map((select, index) => (
              <Select.Item
                key={index}
                label={select.label}
                value={select.value}
              />
            ))}
        </Select>
      )}
      {isInvalid && (
        <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>
      )}

      {children}
    </FormControl>
  );
};

export const RenderInput = ({
  label,
  type,
  placeholder,
  isInvalid,
  name,
  required = false,
  children,
  textArea,
  color = "coolGray.400",
  fontSize = 14,
  select,
  selectOptions,
  ...props
}) => {
  const defaultProps = {
    type,
    name,
    placeholder,
    required,
    mt: 1,
    borderColor: THEME_COLORS.PRIMARY_COLOR,
    borderRadius: 10,
  };

  return (
    <FormControl isRequired={required} isInvalid={isInvalid}>
      <FormControl.Label>
        <Text color={color} fontSize={fontSize}>
          {label}{" "}
        </Text>
      </FormControl.Label>

      {!textArea && !select && <Input {...props} {...defaultProps} />}
      {textArea && <TextArea {...defaultProps} {...props} />}
      {select && (
        <Select {...defaultProps} {...props}>
          {selectOptions &&
            selectOptions.map((select, index) => (
              <Select.Item
                key={index}
                label={select.label}
                value={select.value}
              />
            ))}
        </Select>
      )}
      {isInvalid && (
        <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>
      )}

      {children}
    </FormControl>
  );
};

export const NxtFormLabel = ({
  label,
  required,
  color = "coolGray.400",
  fontSize = 14,
  children,
  ...props
}) => {
  return (
    <FormControl.Label>
      <Text color={color} fontSize={fontSize}>
        {label}
      </Text>
      {required && <Text color="red.500"> *</Text>}
      {children}
    </FormControl.Label>
  );
};

export const NxtButton = ({
  text,
  bg = THEME_COLORS.PRIMARY_COLOR,
  ...args
}) => {
  return (
    <Button
      {...args}
      borderRadius={8}
      shadow={8}
      bg={bg}
      style={{
        shadowColor: bg,
      }}
    >
      <Text fontWeight={800} color="#fff" fontSize={17}>
        {text}
      </Text>
    </Button>
  );
};

export const NxtText = ({
  color = THEME_COLORS.PRIMARY_COLOR,
  fontSize = 16,
  children,
  text,
  ...props
}) => {
  return (
    <Text color={color} fontSize={fontSize} {...props}>
      {text}
      {children}
    </Text>
  );
};

export const NxtDrawerBtn = ({
  px = "5",
  py = "2",
  text,
  iconName = "home",
  iconColor = "gray.500",
  iconSize = "5",
  HStackProps,
  IconProps,
  TextProps,
  children,
  ...props
}) => {
  return (
    <Pressable px={px} py={py} {...props}>
      <HStack space="7" alignItems="center" {...HStackProps}>
        <Icon
          color={iconColor}
          size={iconSize}
          {...IconProps}
          as={<MaterialIcons name={iconName} />}
        />
        <NxtText text={text} {...TextProps} color={iconColor} />
        {children}
      </HStack>
    </Pressable>
  );
};
