class String
	def titleize
		split(/(\W)/).map(&:capitalize).join
	end
end
module Jekyll
	module PluralSentenceCase
		def PluralCase(text)
			if text == "project"
				text.titleize + "s"
			else
				text.titleize
			end
		end
	end
end

Liquid::Template.register_filter(Jekyll::PluralSentenceCase)