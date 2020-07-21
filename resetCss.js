/*

These styles are used for resetting outer styles on preview.

*/

import makeStyles from '@material-ui/styles/makeStyles';

export const useResetCssStyles = makeStyles({
  reset: {
    '&, & a, & b, & button, & form, & i, & img, & input, & p': {
      backgroundAttachment: 'scroll',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      backgroundPosition: '0 0',
      backgroundRepeat: 'repeat',
      border: 'none',
      bottom: 'auto',
      clear: 'none',
      clip: 'auto',
      color: 'inherit',
      counterIncrement: 'none',
      counterReset: 'none',
      cursor: 'auto',
      direction: 'inherit',
      display: 'inline',
      float: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontStyle: 'inherit',
      fontVariant: 'normal',
      fontWeight: 'inherit',
      height: 'auto',
      left: 'auto',
      letterSpacing: 'normal',
      lineHeight: 'inherit',
      listStyleType: 'inherit',
      listStylePosition: 'outside',
      listStyleImage: 'none',
      margin: '0',
      maxHeight: 'none',
      maxWidth: 'none',
      minHeight: '0',
      minWidth: '0',
      opacity: '1',
      outline: 'medium none invert',
      overflow: 'visible',
      padding: '0',
      position: 'static',
      quotes: '"" ""',
      right: 'auto',
      tableLayout: 'auto',
      textAlign: 'inherit',
      textDecoration: 'inherit',
      textIndent: '0',
      textTransform: 'none',
      top: 'auto',
      unicodeBidi: 'normal',
      verticalAlign: 'baseline',
      visibility: 'inherit',
      whiteSpace: 'normal',
      width: 'auto',
      wordSpacing: 'normal',
      zIndex: 'auto',
      backgroundOrigin: 'padding-box',
      WebkitBackgroundClip: 'border-box',
      backgroundClip: 'border-box',
      backgroundSize: 'auto',
      WebkitBorderImage: 'none',
      OBorderImage: 'none',
      borderImage: 'none',
      borderRadius: '0',
      boxShadow: 'none',
      boxSizing: 'content-box',
      WebkitColumnCount: 'auto',
      MozColumnCount: 'auto',
      WebkitColumnGap: 'normal',
      MozColumnGap: 'normal',
      columnGap: 'normal',
      WebkitColumnRule: 'medium none #000',
      MozColumnRule: 'medium none #000',
      columnRule: 'medium none #000',
      WebkitColumnSpan: '1',
      MozColumnSpan: '1',
      columnSpan: '1',
      WebkitColumnWidth: 'auto',
      MozColumnWidth: 'auto',
      columns: 'auto',
      fontFeatureSettings: 'normal',
      overflowX: 'visible',
      overflowY: 'visible',
      WebkitHyphens: 'manual',
      MsHyphens: 'manual',
      hyphens: 'manual',
      WebkitPerspective: 'none',
      MsPerspective: 'none',
      OPerspective: 'none',
      perspective: 'none',
      WebkitPerspectiveOrigin: '50% 50%',
      MsPerspectiveOrigin: '50% 50%',
      OPerspectiveOrigin: '50% 50%',
      perspectiveOrigin: '50% 50%',
      WebkitBackfaceVisibility: 'visible',
      backfaceVisibility: 'visible',
      textShadow: 'none',
      WebkitTransition: 'all 0s ease 0s',
      transition: 'all 0s ease 0s',
      WebkitTransform: 'none',
      transform: 'none',
      WebkitTransformOrigin: '50% 50%',
      transformOrigin: '50% 50%',
      WebkitTransformStyle: 'flat',
      transformStyle: 'flat',
      wordBreak: 'normal'
    },
    '&, & div, & form, & button, & img, & p': {
      display: 'block'
    },
    '& p': {
      margin: '0 !important',
      padding: '0 !important'
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '& a:visited': {
      color: 'inherit'
    },
    '& a, & button, & input': {
      cursor: 'pointer !important'
    },
    '& button': {
      textAlign: 'center !important'
    },
    '& button, & input[type="submit"]': {
      ' -webkit-appearance': 'push-button'
    },
    '& input': {
      background: '#fff',
      padding: '1px',
      fontFamily: 'initial',
      fontSize: 'small',
      verticalAlign: 'middle'
    },
    '& [dir="rtl"]': {
      direction: 'rtl'
    },
    
  }
});
