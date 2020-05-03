import logging
def str2bool(value: str) -> bool:
  if str(value).lower() in ("yes", "true", "t", "y", "1", "1.0"):
    return True
  elif str(value).lower() in ("no", "false", "f", "n", "0", "0.0"):
    return False
  else:
    raise ValueError("Boolean value expected")


def set_handlers_level(level):
    """Sets the level of all handlers to the given logging level 

    This method forcefully set the logging level to the level specified by the 
    caller
    
    Parameters:
      level (logging.Level): the level to set the handlers to
    """
    for h in logging.getLogger().handlers:
        if not isinstance(h, logging.FileHandler):
            h.setLevel(level)
    logging.getLogger().setLevel(level)

