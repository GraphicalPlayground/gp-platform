/**
 * plopfile.js
 *
 * This file is used to configure Plop, a micro-generator framework that helps
 * automate the creation of files and code snippets in your project.
 * By defining custom generators, you can streamline repetitive tasks, enforce
 * consistent coding patterns, and improve development efficiency.
 * Use this file to specify templates, prompts, and actions for generating
 * components, modules, or any other project artifacts.
 */

/** Constant containing the list of possible generators */
const GENERATORS = ['component', 'package'];

/** Constant containing the list of possible workspaces */
const WORKSPACES = ['components', 'core', 'utils'];

/** Constant for default workspaces for each generators */
const DEFAULT_WORKSPACES = {
  component: 'components',
  package: 'utils'
};

/**
 * Exporting the plop configuration
 * @param {import('plop').NodePlopAPI} plop The plop API
 */
module.exports = (plop) => {
  /** Create the generators */
  for (const generator of GENERATORS) {
    plop.setGenerator(generator, {
      description: `Generates a ${generator}`,
      prompts: [
        /** Create a new prompt to set the generator names */
        {
          type: 'input',
          name: `${generator}Name`,
          message: `Enter ${generator} name:`,
          validate: (value) => {
            /** Check if the value is inputed */
            if (!value) {
              return `${generator} name is required`;
            }

            /** Check if the name is a valid hook name 'useSomething' */
            if (generator === 'hook' && !value.startsWith('use')) {
              return `Hook name must start with 'use'`;
            }

            /** Check if the casing is correct */
            if (value !== value.toLowerCase()) {
              return `Hook name must be in lowercase`;
            }

            /** Check if the name contains spaces */
            if (value.includes(' ')) {
              return `${generator} name cannot have spaces`;
            }

            /** Validate the value */
            return true;
          }
        },
        /** Create a new prompt to set the description of the generated content */
        {
          type: 'input',
          name: 'description',
          message: `The description of this ${generator}:`
        },
        /** Create a new prompt to get the working directory */
        {
          type: 'list',
          name: 'outDir',
          message: `Where should this ${generator} live?`,
          default: DEFAULT_WORKSPACES[generator],
          choices: WORKSPACES,
          validate: (value) => {
            /** Check if the value is defined */
            if (!value) {
              return `The working directory is required`;
            }

            /** Otherwise validate the response */
            return true;
          }
        }
      ],
      /** Create the handler when all the prompts are filled */
      actions(anwsers) {
        /** Prepare an empty array of action */
        const actions = [];

        /** Check if some anwser has been filled */
        if (!anwsers) {
          return actions;
        }

        /** Get the information in the anwser */
        const { description, outDir } = anwsers;
        const generatorName = anwsers[`${generator}Name`] ?? '';

        /** Create a new action and push it into the list of actions */
        actions.push({
          type: 'addMany',
          templateFiles: `templates/${generator}/**`,
          destination: `./packages/{{outDir}}/{{dashCase ${generator}Name}}`,
          base: `templates/${generator}`,
          data: {
            [`${generator}Name`]: generatorName,
            description,
            outDir
          },
          abortOnFail: true
        });

        /** Return the list of actions */
        return actions;
      }
    });
  }
};
