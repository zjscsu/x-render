import { useMemo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import './index.less'

const Sidebar = props => {
  const { settings } = props;

  const filteredSettings = useMemo(() => {
    return settings.filter(item => item.show !== false).map(item => {
      return {
        ...item,
        widgets: item.widgets.filter(item => item.show !== false)
      }
    })
  }, [settings]);

  return (
    <div className="fr-generator-sidebar">
      {filteredSettings.map((item, idx) => {
        return (
          <div key={idx} className="fr-generator-sidebar-item">
            <p className="fr-generator-sidebar-item-title">{item.title}</p>
            <ReactSortable
              tag="ul"
              list={item.widgets}
              setList={() => {}}
              group={{
                name: 'fr-generator',
                pull: 'clone',
                put: false
              }}
              sort={false}
            >
              {item.widgets.map((widget, idx) => (
                <li key={idx} className="fr-generator-sidebar-element">
                  {widget.text}
                </li>
              ))}
            </ReactSortable>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
