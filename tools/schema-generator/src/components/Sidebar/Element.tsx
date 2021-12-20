import { useDrag } from 'react-dnd';
import './Element.less';

const Element = ({ text, name, schema, icon, fixedName, getId }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'box',
    item: {
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
      $id: fixedName ? `#/${name}` : `#/${getId(name)}`,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className="fr-generator-sidebar-element">
      {text}
    </div>
  );
};

export default Element;
