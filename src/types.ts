export type ComponentType = 'HEADER' | 'MENU' | 'CARD' | 'LIST' | 'TEXT';

export interface MenuComponent {
  id: string;
  type: ComponentType;
  name: string;
  content: string[];
  y: number;
  x: number;
  color: string;
  bold?: boolean;
  groupId?: string;
}

export interface MenuLayout {
  name: string;
  components: MenuComponent[];
  backgroundColor: string;
}
