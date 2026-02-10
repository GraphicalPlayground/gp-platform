/**
 * Maps the variant props to their respective values.
 * @param props - The props object to map variants from.
 * @param variantKeys - The keys of the variant props to map.
 * @param removeVariantProps - Whether to remove the variant props from the original props object.
 * @returns A tuple containing the mapped props and the variant props.
 */
export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  // Check if variant keys are provided
  if (!variantKeys) {
    return [props, {}];
  }

  // Map the variant props to their respective values
  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});

  // Check if variant props should be removed
  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
};
