import type { Schema, Struct } from '@strapi/strapi';

export interface SectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_section_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_services';
  info: {
    displayName: 'section';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.button', false>;
    header: Schema.Attribute.Component<'section.header', false>;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'section.header': SectionHeader;
      'sections.services': SectionsServices;
      'ui.button': UiButton;
    }
  }
}
