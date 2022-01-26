import './Element.less';

const Element = ({ text, name, schema, icon, fixedName, getId }) => {
  return (
    <div className="fr-generator-sidebar-element">
      {text}
    </div>
  );
};

export default Element;
