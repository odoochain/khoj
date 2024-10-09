from dotenv import load_dotenv
import os
load_dotenv('.credentials/.env')
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

