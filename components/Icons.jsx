import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

export const CompressIcon = (props) => (
  <FontAwesome name="compress" size={24} color="white" {... props} />
);

export const ProtectIcon = (props) => (
  <MaterialIcons name="lock-open" size={24} color="white" {...props} />
);

export const UploadIcon = (props) => (
  <MaterialIcons name="drive-folder-upload" size={24} color="white" {...props} />
);

export const ArrowRightIcon = (props) => (
  <MaterialIcons name="navigate-next" size={24} color="white" {...props} />
);

export const MoreOptionsIcon = (props) => (
  <MaterialIcons name="more-vert" size={24} color="white" {...props} />
);

export const SettingsIcon = (props) => (
  <Feather name="settings" size={24} color="white" {...props} />
);
