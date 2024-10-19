import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Modal from "@mui/material/Modal";

type linkList = { name: string; link: string }[];

function HelpInCustomWidget() {
  const links: linkList = [
    { name: "Indify", link: "https://indify.co/" },
    { name: "WidgetBox", link: "https://widgetbox.app/" },
    { name: "AppNotion", link: "https://apption.co/" },
    { name: "Kairo", link: "https://getkairo.com/notion-blocks" },
  ];

  const musicLinks: linkList = [
    { name: "Spotify", link: "https://open.spotify.com/" },
    { name: "Apple Music", link: "https://music.apple.com/" },
    { name: "Youtube", link: "https://youtube.com/" },
    { name: "SoundCloud", link: "https://soundcloud.com/" },
    { name: "MixCloud", link: "https://mixcloud.com/" },
  ];

  const {
    palette: {
      primaryContainer: { paper },
    },
  } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-0 right-0">
      <IconButton
        onClick={() => setOpen(true)}
        color="primary"
        //
      >
        <Icon icon="material-symbols:help" />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          className="p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3"
          sx={{ background: paper }}>
          <div className="text-xl">
            You can personalize your experience by adding custom widgets! Simply
            enter the URL of your desired widget.
          </div>
          <div className="text-xl">Where To get Widgets?</div>
          <div className="text-xl">
            Here are some sources you can get free widgets from:
          </div>
          <LinkList links={links} />
          <div className="text-xl">
            You can also add Music or Video Widget, you have to go to share and
            copy Embed Link
          </div>
          <div className="text-xl">Here are some Sites for music Widgets </div>
          <LinkList links={musicLinks} />
        </Paper>
      </Modal>
    </div>
  );
}

function LinkList({ links }: { links: linkList }) {
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl">
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default HelpInCustomWidget;
