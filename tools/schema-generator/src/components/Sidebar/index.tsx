import Element from './Element';
import './index.less'

const Sidebar = props => {
  const { settings, getId } = props;

  return (
    <div className="fr-generator-sidebar">
      {settings.map((item, idx) => {
        if (item && item.show === false) {
          return null;
        }
        return (
          <div key={idx} className="fr-generator-sidebar-item">
            <p className="fr-generator-sidebar-item-title">{item.title}</p>
            <ul>
              {item.widgets
                .filter(item => item.show !== false)
                .map((widget, idx) => {
                  return (
                    <Element getId={getId} key={idx.toString()} {...props} {...widget} />
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
