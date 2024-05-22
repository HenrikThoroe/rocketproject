'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DesktopMacRoundedIcon from '@mui/icons-material/DesktopMacRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded'
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'

/**
 * The names of the icons that can be rendered.
 */
export type IconName =
  | 'desktop'
  | 'storage'
  | 'play'
  | 'login'
  | 'stats'
  | 'add'
  | 'memory'
  | 'download'
  | 'upload'
  | 'attach'
  | 'delete'
  | 'assignment'
  | 'edit'
  | 'copy'
  | 'filter'
  | 'visibility'
  | 'error'
  | 'replay'
  | 'next'
  | 'prev'
  | 'query-stats'
  | 'remove'
  | 'person'
  | 'logout'
  | 'email-read'
  | 'game'

interface Props {
  /**
   * The name of the icon to render.
   */
  name: IconName
}

/**
 * Client side wrapper for a subset of MUI icons.
 */
export default function Icon(props: Props) {
  switch (props.name) {
    case 'desktop':
      return <DesktopMacRoundedIcon />
    case 'storage':
      return <StorageRoundedIcon />
    case 'play':
      return <PlayCircleOutlineRoundedIcon />
    case 'login':
      return <LoginRoundedIcon />
    case 'stats':
      return <BarChartRoundedIcon />
    case 'add':
      return <AddRoundedIcon />
    case 'memory':
      return <MemoryRoundedIcon />
    case 'download':
      return <FileDownloadRoundedIcon />
    case 'upload':
      return <FileUploadRoundedIcon />
    case 'attach':
      return <AttachFileRoundedIcon />
    case 'delete':
      return <DeleteForeverRoundedIcon />
    case 'assignment':
      return <AssignmentRoundedIcon />
    case 'edit':
      return <EditRoundedIcon />
    case 'copy':
      return <ContentCopyRoundedIcon />
    case 'filter':
      return <FilterListRoundedIcon />
    case 'visibility':
      return <VisibilityRoundedIcon />
    case 'error':
      return <ErrorOutlineRoundedIcon />
    case 'replay':
      return <ReplayRoundedIcon />
    case 'next':
      return <ArrowForwardIosRoundedIcon />
    case 'prev':
      return <ArrowBackIosRoundedIcon />
    case 'query-stats':
      return <QueryStatsRoundedIcon />
    case 'remove':
      return <RemoveRoundedIcon />
    case 'person':
      return <PersonRoundedIcon />
    case 'logout':
      return <LogoutRoundedIcon />
    case 'email-read':
      return <MarkEmailReadRoundedIcon />
    case 'game':
      return <SportsEsportsRoundedIcon />
  }
}
