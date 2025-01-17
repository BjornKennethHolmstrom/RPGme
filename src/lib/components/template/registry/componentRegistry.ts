import type { SvelteComponent } from 'svelte';
import TextField from '../fields/TextField.svelte';
import SkillTreeField from '../fields/SkillTree.svelte';
import ListField from '../fields/ListField.svelte';

type ComponentRegistry = {
  [key: string]: typeof SvelteComponent;
};

export const fieldComponents: ComponentRegistry = {
  text: TextField,
  skillTree: SkillTreeField,
  list: ListField,
  // Add more field components as we create them
};

export function getFieldComponent(type: string): typeof SvelteComponent {
  const component = fieldComponents[type];
  if (!component) {
    throw new Error(`No component registered for field type: ${type}`);
  }
  return component;
}
