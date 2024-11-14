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

export const WordIcon = (props) => (
  <FontAwesome name="file-word-o" size={24} color="black" {...props}/>
);

export const ExcelIcon = (props) => (
  <FontAwesome name="file-excel-o" size={24} color="black"  {...props} />
);

export const PdfIcon = (props) => (
  <FontAwesome name="file-pdf-o" size={24} color="black" {...props} />
);

export const VideoIcon = (props) => (
  <FontAwesome name="file-video-o" size={24} color="black" {...props} />
);

export const ImgIcon = (props) => (
  <FontAwesome name="image" size={24} color="black" {...props} />
);

export const AudioIcon = (props) => (
  <FontAwesome name="file-audio-o" size={24} color="black" {...props} />
);