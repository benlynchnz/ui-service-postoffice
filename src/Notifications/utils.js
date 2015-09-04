let utils = {};

let componentDidMount = (ctx) => {
  let rootNode = React.findDOMNode(ctx),
  hasNextProps = false,
  nextProps = {},
  parentNode = rootNode.parentNode;

  Object.keys(parentNode.attributes).forEach((key) => {
    let namedNode;

    if (key !== "length") {
      hasNextProps = true;
      namedNode = parentNode.attributes[key];
      nextProps[namedNode.name] = namedNode.value;
    }
  });

  if (hasNextProps) {
    ctx._updateState(nextProps);
  }

  ctx.setState({ element: ctx.props.element });
};

utils.componentDidMount = componentDidMount;

export default utils;
