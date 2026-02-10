/**
 * @brief Represents the variants for Graphical Playground Tailwind CSS.
 * @description This object contains all the variants used in the Graphical Playground Tailwind CSS plugin.
 */
export const variants: Record<string, string[]> = {
  /**
   * @brief Represents the hocus variant.
   * @description This variant applies styles on hover, focus, and focus-visible states.
   */
  'hocus': ['&:hover', '&:focus', '&:focus-visible'],

  /**
   * @brief Represents the group-hocus variant.
   * @description This variant applies styles on hover, focus, and focus-visible states within a group.
   */
  'group-hocus': [':merge(.group):hover &', ':merge(.group):focus &', ':merge(.group):focus-visible &'],

  /**
   * @brief Represents the peer-hocus variant.
   * @description This variant applies styles on hover, focus, and focus-visible states of a peer element.
   */
  'peer-hocus': [':merge(.peer):hover ~ &', ':merge(.peer):focus ~ &', ':merge(.peer):focus-visible ~ &']
};
