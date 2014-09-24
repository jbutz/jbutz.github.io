# http://realjenius.com/2012/12/01/jekyll-category-tag-paging-feeds/
require "json"
module Jekyll
	class CatsAndTags < Generator
		safe true
		def initialize(site)
			@site = site
		end
		def generate(site)
			site.categories.each do |category|
				if category[0] == "blog"
					build_subpages(site, "category", category)
				end
				if category[0] == "project"
					category[1] = category[1].sort_by { |p| -p.date.to_f } 
					atomize(site,"category", category)
				end
			end

			# site.tags.each do |tag|
			#	build_subpages(site, "tag", tag)
			# end
		end

		def build_subpages(site, type, posts) 
			posts[1] = posts[1].sort_by { |p| -p.date.to_f }     
			atomize(site, type, posts)
			paginate(site, type, posts)
		end

		def atomize(site, type, posts)
			path = "/#{posts[0]}"
			atom = AtomPage.new(site, site.source, path, type, posts[0], posts[1])
			site.pages << atom
		end

		def paginate(site, type, posts)
			pages = Jekyll::Paginate::Pager.calculate_pages(posts[1], site.config['paginate'].to_i)
			(1..pages).each do |num_page|
				pager = Jekyll::Paginate::Pager.new(site, num_page, posts[1], pages)
				path = "/#{posts[0]}"
				if num_page > 1
					path = path + "/page#{num_page}"
				end
				newpage = GroupSubPage.new(site, site.source, path, type, posts[0])
				newpage.pager = pager
				site.pages << newpage 
			end
		end
	end

	class GroupSubPage < Page
		def initialize(site, base, dir, type, val)
			@site = site
			@base = base
			@dir = dir
			@name = 'index.html'

			self.process(@name)
			self.read_yaml(File.join(base, '_layouts'), "group_blog.html")
			self.data["grouptype"] = type
			self.data[type] = val
		end
	end

	class AtomPage < Page
		def initialize(site, base, dir, type, val, posts)
			@site = site
			@base = base
			@dir = dir
			@name = 'atom.xml'
			self.process(@name)
			self.read_yaml(File.join(base, '_layouts'), "group_atom.xml")
			self.data[type] = val
			self.data["grouptype"] = type
			self.data["posts"] = posts[0..9]
		end
	end
end